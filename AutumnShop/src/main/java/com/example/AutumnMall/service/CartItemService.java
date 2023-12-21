package com.example.AutumnMall.service;

import com.example.AutumnMall.dto.AddCartDto;
import com.example.AutumnMall.repository.CartItemRepository;
import com.example.AutumnMall.repository.CartRepository;
import com.example.AutumnMall.domain.Cart;
import com.example.AutumnMall.domain.CartItem;
import com.example.AutumnMall.dto.AddCartItemDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CartItemService {
    private final CartItemRepository cartItemRepository;
    private final CartRepository cartRepository;
    @Transactional
    public CartItem addCartItem(AddCartItemDto addCartItemDto) {
        Cart cart = cartRepository.findById(addCartItemDto.getCartId()).orElseThrow();

        CartItem cartItem = new CartItem();
        cartItem.setCart(cart);
        cartItem.setQuantity(addCartItemDto.getQuantity());
        cartItem.setProductId(addCartItemDto.getProductId());
        cartItem.setProductPrice(addCartItemDto.getProductPrice());
        cartItem.setProductTitle(addCartItemDto.getProductTitle());
        cartItem.setProductDescription(addCartItemDto.getProductDescription());

        return cartItemRepository.save(cartItem);
    }

    @Transactional(readOnly = true)
    public boolean isCartItemExist(Long memberId, Long cartId, Long productId) {
        boolean check = cartItemRepository.existsByCart_memberIdAndCart_idAndProductId(memberId, cartId, productId);
        return check;
    }

    @Transactional(readOnly = true)
    public CartItem getCartItem(Long memberId, Long cartId, Long productId) {
        return cartItemRepository.findByCart_memberIdAndCart_idAndProductId(memberId, cartId, productId).orElseThrow();
    }

    @Transactional
    public CartItem updateCartItem(CartItem cartItem) {
        CartItem findCartItem = cartItemRepository.findById(cartItem.getId()).orElseThrow();
        findCartItem.setQuantity(cartItem.getQuantity());
        return findCartItem;
    }

    @Transactional(readOnly = true)
    public boolean isCartItemExist(Long memberId, Long cartItemId) {
        return cartItemRepository.existsByCart_memberIdAndId(memberId, cartItemId);
    }

    @Transactional
    public void deleteCartItem(Long memberId, Long cartItemId) {
        cartItemRepository.deleteByCart_memberIdAndId(memberId, cartItemId);
    }

    @Transactional(readOnly = true)
    public List<CartItem> getCartItems(Long memberId, Long cartId) {
        return cartItemRepository.findByCart_IdAndCart_MemberId(cartId, memberId);
    }

    @Transactional(readOnly = true)
    public List<CartItem> getCartItems(Long memberId) {
        return cartItemRepository.findByCart_memberId(memberId);
    }
}
