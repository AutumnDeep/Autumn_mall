package com.example.AutumnMall.service;

import com.example.AutumnMall.domain.Order;
import com.example.AutumnMall.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true) // 읽기 전용 트랜잭션 설정
public class OrderService {

    private final OrderRepository orderRepository;

    public List<Order> findByMemberId(Long orderId) {
        // 주문 ID로 주문 엔티티를 찾고, 결과를 반환합니다.
        // 결과가 없는 경우 null을 반환할 수 있으나, Optional을 사용하는 것이 더 나은 접근 방식일 수 있습니다.
        return orderRepository.findByMember_memberId(orderId);
    }

    // 필요에 따라 주문 생성, 주문 상태 업데이트, 주문 취소 등의 메서드를 추가할 수 있습니다.
}