package com.example.AutumnMall.service;

import com.example.AutumnMall.domain.Product;
import com.example.AutumnMall.dto.ResponseGetCartItemDto;
import com.example.AutumnMall.repository.CartItemRepository;
import com.example.AutumnMall.repository.CartRepository;
import com.example.AutumnMall.domain.Cart;
import com.example.AutumnMall.domain.CartItem;
import com.example.AutumnMall.dto.AddCartItemDto;
import com.example.AutumnMall.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CartItemService {
    private final CartItemRepository cartItemRepository;
    private final CartRepository cartRepository;
    private final ProductRepository productRepository;

    @Transactional
    public CartItem addCartItem(AddCartItemDto addCartItemDto) {
        Cart cart = cartRepository.findById(addCartItemDto.getCartId()).orElseThrow();
        Product product = productRepository.findById(addCartItemDto.getProductId()).orElseThrow();

        CartItem cartItem = new CartItem();
        cartItem.setCart(cart);
        cartItem.setQuantity(addCartItemDto.getQuantity());
        cartItem.setProduct(product);

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
        return cartItemRepository.existsByCart_memberIdAndCartId(memberId, cartItemId);
    }

    @Transactional(readOnly = true)
    public List<ResponseGetCartItemDto> getCartItems(Long memberId, Long cartId) {
        List<CartItem> cartItems = cartItemRepository.findByCart_IdAndCart_MemberId(cartId, memberId);

        return cartItems.stream()
                .map(cartItem -> {
                    Product product = cartItem.getProduct();

                    return new ResponseGetCartItemDto(
                            cartItem.getId(),
                            product.getTitle(),
                            product.getPrice(),
                            product.getDescription(),
                            cartItem.getQuantity(),
                            product.getImageUrl()
                    );
                })
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<ResponseGetCartItemDto> getCartItems(Long memberId) {
        List<CartItem> cartItems = cartItemRepository.findByCart_memberId(memberId);

        return cartItems.stream().map(cartItem -> new ResponseGetCartItemDto(
                cartItem.getId(),
                cartItem.getProduct().getTitle(),
                cartItem.getProduct().getPrice(),
                cartItem.getProduct().getDescription(),
                cartItem.getQuantity(),
                cartItem.getProduct().getImageUrl()
        )).collect(Collectors.toList());
    }

    @Transactional
    public void deleteCartItem(Long cartItemId) { cartItemRepository.deleteByCartId(cartItemId); }

    @Transactional
    public void deleteCartItem(Long cartItemId, Long Id){
        cartItemRepository.deleteByCartIdAndId(cartItemId, Id);
    }

}
