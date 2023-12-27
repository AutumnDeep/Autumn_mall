package com.example.AutumnMall.repository;

import com.example.AutumnMall.domain.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, Long> {
    Page<Product> findProductByCategory_id(Long categoryId, Pageable pageable);

    Optional<Product> findImageUrlById(Long id);

    Optional<Product> findById(Long id);

}
