package com.example.demo.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Data
@Table(name = "user_transactions")
@EqualsAndHashCode(of="id")
public class UserTransactionHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private String operation;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private User user;

    public UserTransactionHistory(){

    }
    public UserTransactionHistory(String operation, User user){
        this.operation = operation;
        this.user = user;

    }

    @Override
    public String toString() {
        return "UserTransactionHistory{" +
                "id=" + id +
                ", operation='" + operation + '\'' +
                '}';
    }
}
