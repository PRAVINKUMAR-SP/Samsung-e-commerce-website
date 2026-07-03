package opffarmy.backend.controller;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import opffarmy.backend.entity.Product;
import opffarmy.backend.service.ProductService;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService service;

    public ProductController(ProductService service) {

        this.service = service;

    }

    // GET ALL PRODUCTS
    @GetMapping
    public List<Product> getAll() {

        return service.getAll();

    }

    // ADD PRODUCT + IMAGE
    @PostMapping(consumes = {"multipart/form-data"})
    public Product addProduct(
            @RequestPart("product") Product product,
            @RequestPart(value = "image", required = false) MultipartFile image
    ) throws Exception {

        if (image != null && !image.isEmpty()) {

            String fileName
                    = System.currentTimeMillis()
                    + "_"
                    + image.getOriginalFilename();

            Path uploadPath
                    = Paths.get("uploads");

            if (!Files.exists(uploadPath)) {

                Files.createDirectories(uploadPath);

            }

            Path filePath
                    = uploadPath.resolve(fileName);

            Files.write(
                    filePath,
                    image.getBytes()
            );

            product.setImage(fileName);

        }

        return service.add(product);

    }

    // IMAGE DISPLAY API
    @GetMapping("/image/{name}")
    public ResponseEntity<Resource> getImage(
            @PathVariable String name
    ) throws Exception {

        Path path
                = Paths.get("uploads").resolve(name);

        Resource resource
                = new UrlResource(path.toUri());

        return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_JPEG)
                .body(resource);

    }

    // UPDATE PRODUCT
    @PutMapping("/{id}")

    public Product update(
            @PathVariable Long id,
            @RequestBody Product product
    ) {

        return service.update(
                id,
                product
        );

    }

    // DELETE PRODUCT
    @DeleteMapping("/{id}")

    public String delete(
            @PathVariable Long id
    ) {

        service.delete(id);

        return "Deleted";

    }

}
