package opffarmy.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import opffarmy.backend.entity.Order;
import opffarmy.backend.repository.OrderRepository;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    // Save Order
    public Order saveOrder(Order order) {

        order.setOrderStatus("Pending");

        return orderRepository.save(order);
    }

    // Get All Orders
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    // Get Order By Id
    public Order getOrderById(Long id) {

        return orderRepository.findById(id).orElse(null);
    }

    // Get Orders By Phone Number
    public List<Order> getOrdersByPhone(String phone) {

        return orderRepository.findByPhone(phone);
    }

    // Get Orders By Status
    public List<Order> getOrdersByStatus(String status) {

        return orderRepository.findByOrderStatus(status);
    }

    // Update Order Status
    public Order updateOrderStatus(Long id, String status) {

        Order order = orderRepository.findById(id).orElse(null);

        if (order != null) {

            order.setOrderStatus(status);

            return orderRepository.save(order);
        }

        return null;
    }

    // Delete Order
    public void deleteOrder(Long id) {

        orderRepository.deleteById(id);
    }

}