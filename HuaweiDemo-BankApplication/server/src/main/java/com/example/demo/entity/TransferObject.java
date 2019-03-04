package com.example.demo.entity;

import lombok.Data;

@Data
public class TransferObject {
    private String receiverUserTC;
    private String currentUserTC;
    private Long amount;

}
