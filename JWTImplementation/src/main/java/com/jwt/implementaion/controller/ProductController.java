package com.jwt.implementaion.controller;

import com.jwt.implementaion.entity.Product;
import com.jwt.implementaion.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/auth/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts() {
        List<Product> products = productService.getAllProducts();
        return ResponseEntity.ok(products);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/category/{categoryId}")
    public ResponseEntity<List<Product>> getProductsByCategory(@PathVariable Long categoryId) {
        List<Product> products = productService.getProductsByCategoryId(categoryId);
        return ResponseEntity.ok(products);
    }
}
