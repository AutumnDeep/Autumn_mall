package com.example.AutumnMall.service;

import com.example.AutumnMall.domain.*;
import com.example.AutumnMall.repository.CartItemRepository;
import com.example.AutumnMall.repository.PaymentRepository;
import com.example.AutumnMall.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PaymentService {
    private final PaymentRepository paymentRepository;
    private final CartItemRepository cartItemRepository;
    private final ProductRepository productRepository;

    @Transactional
    public List<Payment> addPayment(Long memberId, Long cartId){
        List<CartItem> cartItems = cartItemRepository.findByCart_IdAndCart_MemberId(cartId, memberId);
        List<Payment> payments = new ArrayList<>();

        LocalDate localDate = LocalDate.now();
        localDate.getYear();
        localDate.getDayOfMonth();
        localDate.getMonthValue();
        String date = String.valueOf(localDate.getYear()) + (localDate.getMonthValue() < 10 ? "0" :"") + String.valueOf(localDate.getMonthValue()) + (localDate.getDayOfMonth() < 10 ? "0" :"") +String.valueOf(localDate.getDayOfMonth());

        Iterator<CartItem> iterator = cartItems.iterator();
        while(iterator.hasNext()){
            CartItem cartItem = iterator.next();

            Product product = productRepository.findByProductId(cartItem.getProductId());

            Payment userPayment = new Payment();
            userPayment.setImageUrl(product.getImageUrl());
            userPayment.setProductId(cartItem.getProductId());
            userPayment.setProductPrice(cartItem.getProductPrice());
            userPayment.setProductTitle(cartItem.getProductTitle());
            userPayment.setProductRate(product.getRating().getRate());
            userPayment.setQuantity(cartItem.getQuantity());
            userPayment.setMemberId(memberId);
            userPayment.setDate(date);

            payments.add(paymentRepository.save(userPayment));
        }

        return payments;
    }

}
