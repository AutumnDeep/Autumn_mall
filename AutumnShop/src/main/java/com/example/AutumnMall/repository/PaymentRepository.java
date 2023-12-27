package com.example.AutumnMall.repository;

import com.example.AutumnMall.domain.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
}
