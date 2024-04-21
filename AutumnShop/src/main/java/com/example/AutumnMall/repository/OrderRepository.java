package com.example.AutumnMall.repository;

import com.example.AutumnMall.domain.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    // JpaRepository는 JPA 엔티티에 대한 기본적인 CRUD 연산을 제공하는 스프링 데이터 인터페이스임
    List<Order> findByMember_memberId(Long memberId); // 사용자 ID를 기준으로 주문 목록을 찾는 메소드
    // 이 메소드는 사용자별로 주문 내역을 조회할 때 사용
    // 파라미터로 받은 memberId에 해당하는 모든 Order 엔티티의 리스트를 반환
}
