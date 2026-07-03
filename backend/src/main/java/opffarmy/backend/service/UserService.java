package opffarmy.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import opffarmy.backend.entity.User;
import opffarmy.backend.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    UserRepository repo;

    public User register(User user) {

        Optional<User> existing = repo.findByEmail(user.getEmail());

        if (existing.isPresent()) {
            throw new RuntimeException("Email already exists");
        }

        return repo.save(user);
    }

    public User login(String email, String password) {

        Optional<User> user = repo.findByEmail(email);

        if (user.isPresent() && user.get().getPassword().equals(password)) {
            return user.get();
        }

        throw new RuntimeException("Invalid Email or Password");
    }

    // Get all users
    public List<User> getAllUsers() {
        return repo.findAll();
    }
}