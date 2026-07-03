package opffarmy.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import opffarmy.backend.entity.Order;
import opffarmy.backend.service.OrderService;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "*")
public class OrderController {

    @Autowired
    private OrderService orderService;

    // CREATE ORDER
    @PostMapping
    public Order createOrder(
            @RequestBody Order order
    ) {

        return orderService.saveOrder(order);

    }

    // GET ALL ORDERS
    @GetMapping
    public List<Order> getAllOrders() {

        return orderService.getAllOrders();

    }

    // GET ORDER BY ID
    @GetMapping("/{id}")
    public Order getOrderById(
            @PathVariable Long id
    ) {

        return orderService.getOrderById(id);

    }

    // GET ORDERS BY PHONE
    @GetMapping("/phone/{phone}")
    public List<Order> getOrdersByPhone(
            @PathVariable String phone
    ) {

        return orderService.getOrdersByPhone(phone);

    }

    // UPDATE ORDER STATUS
    @PutMapping("/{id}")
    public Order updateOrderStatus(
            @PathVariable Long id,
            @RequestParam String status
    ) {

        return orderService.updateOrderStatus(
                id,
                status
        );

    }

    // DELETE ORDER
    @DeleteMapping("/{id}")
    public String deleteOrder(
            @PathVariable Long id
    ) {

        orderService.deleteOrder(id);

        return "Order deleted successfully";

    }

}
