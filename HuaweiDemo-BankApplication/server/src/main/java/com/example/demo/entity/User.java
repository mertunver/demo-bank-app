package com.example.demo.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.List;

@Entity
@Data
@Table(name = "bank_users")
@EqualsAndHashCode(of="id")
public class User implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @NotNull
    @Column(unique = true)
    private String tcNo;
    @NotNull
    private String username;
    @NotNull
    private String password;
    @NotNull
    private Long balance = Long.valueOf(130000);
    @NotNull
    private String currencyUnit = "TRY";

    @NotNull
    private Long exchangeDay= Long.valueOf(0);

    @NotNull
    private Long transferDay =  Long.valueOf(0);

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<UserTransactionHistory> histories;

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", tcNo='" + tcNo + '\'' +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", balance=" + balance +
                ", currencyUnit='" + currencyUnit + '\'' +
                ", exchangeDay=" + exchangeDay +
                ", transferDay=" + transferDay +
                '}';
    }
}
