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
import java.util.Optional;

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

            Optional<Product> product = productRepository.findById(cartItem.getProductId());
            Product productItem = product.get();


            Payment userPayment = new Payment();
            userPayment.setImageUrl(productItem.getImageUrl());
            userPayment.setProductId(cartItem.getProductId());
            userPayment.setProductPrice(cartItem.getProductPrice());
            userPayment.setProductTitle(cartItem.getProductTitle());
            userPayment.setProductRate(productItem.getRating().getRate());
            userPayment.setQuantity(cartItem.getQuantity());
            userPayment.setMemberId(memberId);
            userPayment.setDate(date);


            payments.add(paymentRepository.save(userPayment));
            cartItemRepository.deleteByCart_memberId(memberId);
        }

        return payments;
    }

    @Transactional
    public List<Payment> getPayment(Long memberId){
        return paymentRepository.findByMemberId(memberId);
    }

}
