package com.example.AutumnMall.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "order_item")
@Getter
@Setter
public class OrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "order_id")
    private Order order; // 속한 주문 정보

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product; // 주문된 상품 정보

    private int orderPrice; // 주문 가격

    private int quantity; // 주문 수량


}