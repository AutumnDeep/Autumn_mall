package com.example.AutumnMall.controller;
import com.example.AutumnMall.domain.Order;
import com.example.AutumnMall.security.jwt.util.IfLogin;
import com.example.AutumnMall.security.jwt.util.LoginUserDto;
import com.example.AutumnMall.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @GetMapping
    public List<Order> getOrderById(@IfLogin LoginUserDto loginUserDto) { // 로그인을 해야 사용할 수 있도록 변경
        List<Order> order = orderService.findByMemberId(loginUserDto.getMemberId());
        if (order != null) {
            return order;
        } else {
            return null;
        }
    }

}