package com.jwt.implementaion.repository;

import com.jwt.implementaion.entity.ProductIndex;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;
import java.util.*;

@Repository
public interface ProductIndexRepository extends ElasticsearchRepository<ProductIndex, Long> {
	List<ProductIndex> findByNameContainingOrCategoryNameContainingOrDescriptionContaining(String name, String categoryName, String description);
}
