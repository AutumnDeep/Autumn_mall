package com.example.AutumnMall.repository;

import com.example.AutumnMall.domain.CartItem;
import com.example.AutumnMall.domain.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    boolean existsByCart_memberIdAndCart_idAndProductId(Long memberId, Long cartId, Long productId);
    Optional<CartItem> findByCart_memberIdAndCart_idAndProductId(Long memberId, Long cartId, Long productId);

    boolean existsByCart_memberIdAndCartId(Long memberId, Long cartItemId);
    Integer deleteByCart_memberId(Long memberId);


    List<CartItem> findByCart_memberIdAndCart_id(Long memberId, Long cartId);

    List<CartItem> findByCart_memberId(Long memberId);

    List<CartItem> findByCart_IdAndCart_MemberId(Long cartId, Long memberId);

    List<CartItem> deleteByCartId(Long cartItemId);

    List<CartItem> deleteByCartIdAndId(Long cartItemId, Long Id);
}
