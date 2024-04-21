package com.example.AutumnMall.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "orders")
@Getter
@Setter
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // 주문의 고유 식별자

    @ManyToOne // 다대일 관계를 나타냄. 여러 주문이 하나의 회원에 속할 수 있음.
    @JoinColumn(name = "member_id") // 외래 키로 'member_id'를 사용하여 'Member' 엔티티와 연결.
    private Member member; // 주문한 회원 정보

    private LocalDateTime orderDate; // 주문 날짜와 시간

    @Enumerated(EnumType.STRING) // 열거형을 사용하여 주문 상태를 나타냄. EnumType.STRING은 열거형 이름을 문자열로 데이터베이스에 저장.
    private OrderStatus status; // 주문 상태 (예: ORDERED, CANCELLED)

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL) // 일대다 관계를 나타냄. 하나의 주문은 여러 주문 항목을 가질 수 있음. 'order' 필드에 의해 주문 항목이 매핑됨.
    private List<OrderItem> orderItems = new ArrayList<>();

    // 주문에 대한 추가 로직이 필요할 경우 메서드 추가
}