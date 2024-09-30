package com.jwt.implementaion.repository;

import com.jwt.implementaion.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByCategoryId(Long categoryId); // This method retrieves products based on category ID
}
