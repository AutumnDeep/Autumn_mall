package com.example.AutumnMall.dto;

import lombok.Data;

import java.util.List;

@Data
public class AddPaymentDto {
    private Long cartId;
    private List<Integer> quantity;
}
