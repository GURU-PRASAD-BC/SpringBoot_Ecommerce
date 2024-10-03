package com.jwt.implementaion.controller;

import com.jwt.implementaion.entity.ProductIndex;
import com.jwt.implementaion.service.ProductSearchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ProductSearchController {

    @Autowired
    private ProductSearchService productSearchService;

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/auth/search")
    public List<ProductIndex> searchProducts(@RequestParam String query) {
        return productSearchService.searchProducts(query);
    }
}
