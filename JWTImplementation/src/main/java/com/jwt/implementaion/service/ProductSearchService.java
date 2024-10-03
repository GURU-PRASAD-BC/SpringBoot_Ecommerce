package com.jwt.implementaion.service;

import com.jwt.implementaion.entity.Product;
import com.jwt.implementaion.entity.ProductIndex;
import com.jwt.implementaion.repository.ProductIndexRepository;
import com.jwt.implementaion.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import jakarta.annotation.PostConstruct;
import java.util.List;

@Service
public class ProductSearchService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ProductIndexRepository productIndexRepository;

    @PostConstruct
    public void init() {
        syncProductsToElasticsearch();
    }

    // Syncs products from the JPA database to Elasticsearch index
    public void syncProductsToElasticsearch() {
        List<Product> products = productRepository.findAll();
        for (Product product : products) {
            ProductIndex productIndex = new ProductIndex();
            productIndex.setId(product.getId());
            productIndex.setName(product.getName());
            productIndex.setOriginalPrice(product.getOriginalPrice());
            productIndex.setDiscountedPrice(product.getDiscountedPrice());
            productIndex.setStockCount(product.getStockCount());
            productIndex.setImageUrl(product.getImageUrl());

            // Setting categoryName and description
            productIndex.setCategoryName(product.getCategory().getName()); // Assuming Category entity has getName()
            productIndex.setDescription(product.getCategory().getDescription()); // Assuming Category has description
            
            productIndexRepository.save(productIndex);
        }
    }

    // Search method that includes categoryName and description
    public List<ProductIndex> searchProducts(String query) {
        return productIndexRepository.findByNameContainingOrCategoryNameContainingOrDescriptionContaining(query, query, query);
    }
}
