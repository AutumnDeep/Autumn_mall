package com.example.AutumnMall.repository;

import com.example.AutumnMall.domain.Payment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
    List<Payment> findByMemberId(Long memberId);

    Page<Payment> findByMemberIdAndDateBetween(Long memberId, LocalDate startDate, LocalDate endDate, Pageable pageable);

    Page<Payment> findAllByMemberId(Long memberId, Pageable pageable);
}
