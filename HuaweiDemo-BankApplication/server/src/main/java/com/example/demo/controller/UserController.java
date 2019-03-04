package com.example.demo.controller;

import com.example.demo.entity.TransferObject;
import com.example.demo.entity.User;
import com.example.demo.entity.UserTransactionHistory;
import com.example.demo.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class UserController {
    private UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<User> checkUser(@RequestBody User userInfo) {
        User enrolledUser = userRepository.findAll().stream().filter(user -> user.getUsername().equals(userInfo.getUsername()) && user.getPassword().equals(userInfo.getPassword())).findFirst().get();
        return enrolledUser != null ? new ResponseEntity<>(enrolledUser, HttpStatus.OK) : new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
    }


    @RequestMapping(value = "/register", method = RequestMethod.POST)
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<Boolean> addUser(@RequestBody User newUser) {
        try {
            userRepository.save(newUser);
        } catch (Exception e) {
            return new ResponseEntity<>(false, HttpStatus.CONFLICT);
        }
        return new ResponseEntity<>(true, HttpStatus.OK);

    }

    @RequestMapping(value = "/transfer", method = RequestMethod.POST)
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<?> transfer(@RequestBody TransferObject transferObject) {
        User currentUser;
        User receiverUser;
        Long amount = transferObject.getAmount();
        try {

            if (amount >= 20000) {
                return new ResponseEntity<>("Exceeded Maximum Value Per Transaction", HttpStatus.INTERNAL_SERVER_ERROR);
            }


            currentUser = userRepository.findUserByTC(transferObject.getCurrentUserTC());
            receiverUser = userRepository.findUserByTC(transferObject.getReceiverUserTC());

            if (currentUser.getTransferDay() < Long.valueOf(100000) && (currentUser.getTransferDay() + amount) < Long.valueOf(100000)) {

                //MONEY TRANSFER
                currentUser.setBalance(currentUser.getBalance() - amount);
                receiverUser.setBalance(receiverUser.getBalance() + amount);

                //UPDATE CURRENT USER MAX TRANSFER VALUE
                currentUser.setTransferDay(currentUser.getTransferDay() + amount);

                //UPDATE HISTORY OF BOTH RECEIVER AND CURRENT USER
                UserTransactionHistory operationForCurrent = new UserTransactionHistory(amount + " Outgoing Transfer from " + currentUser.getUsername() + " to " + receiverUser.getUsername(), currentUser);
                UserTransactionHistory operationForReceiver = new UserTransactionHistory(amount + " Incoming Transfer from " + currentUser.getUsername() + " to " + receiverUser.getUsername(), receiverUser);

                currentUser.getHistories().add(operationForCurrent);
                currentUser.setHistories(currentUser.getHistories());

                receiverUser.getHistories().add(operationForReceiver);
                receiverUser.setHistories(receiverUser.getHistories());


                //SAVE ACTION
                userRepository.save(currentUser);
                userRepository.save(receiverUser);
            } else {
                return new ResponseEntity<>("Max Transfer For The Day = 100K !", HttpStatus.INTERNAL_SERVER_ERROR);
            }

        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.CONFLICT);
        }
        return new ResponseEntity<>(currentUser, HttpStatus.OK);

    }

    @RequestMapping(value = "/transactionHistory", method = RequestMethod.POST)
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<?> transactionHistory(@RequestBody User user) {
        List<UserTransactionHistory> listOfHistory;
        try {
            User currentUser = userRepository.findUserByTC(user.getTcNo());
            listOfHistory = currentUser.getHistories();

        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);

        }
        return new ResponseEntity<>(listOfHistory, HttpStatus.OK);
    }


}

