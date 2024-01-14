package com.example.AutumnMall.controller;

import com.example.AutumnMall.domain.Payment;
import com.example.AutumnMall.dto.AddPaymentDto;
import com.example.AutumnMall.security.jwt.util.IfLogin;
import com.example.AutumnMall.security.jwt.util.LoginUserDto;
import com.example.AutumnMall.service.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/payment")
public class PaymentController {
    private final PaymentService paymentService;


    @PostMapping
    public List<Payment> payment(@IfLogin LoginUserDto loginUserDto,
                                 @RequestBody AddPaymentDto addPaymentDto) {
        try {
            return paymentService.addPayment(loginUserDto.getMemberId(),
                    addPaymentDto.getCartId(), addPaymentDto.getQuantity());

        }catch(Exception ex){
            ex.printStackTrace();
            return null;
        }
    }

    @GetMapping
    public List<Payment> paymentListGet(@IfLogin LoginUserDto loginUserDto){
            return paymentService.getPayment(loginUserDto.getMemberId());
    }

    @GetMapping("/{year}/{month}")
    public List<Payment> paymentListGet(@IfLogin LoginUserDto loginUserDto,
                                        @PathVariable(required = false) Integer year,
                                        @PathVariable(required = false) Integer month) {
        return paymentService.getPaymentDate(loginUserDto.getMemberId(), year, month);
    }
}
