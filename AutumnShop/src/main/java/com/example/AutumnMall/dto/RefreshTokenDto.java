package com.example.AutumnMall.dto;

import lombok.Data;

import javax.validation.constraints.*;

@Data
public class RefreshTokenDto {
    @NotEmpty
    String refreshToken;
}
