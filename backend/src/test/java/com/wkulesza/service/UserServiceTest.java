package com.wkulesza.service;

import com.wkulesza.entity.User;
import com.wkulesza.exception.AuthException;
import com.wkulesza.repository.UserRepository;
import com.wkulesza.security.JwtTokenProvider;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@SpringBootTest
public class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private JwtTokenProvider jwtTokenProvider;

    @Mock
    private AuthenticationManager authenticationManager;

    @InjectMocks
    private UserService userService;

    @Test
    public void testLogin_ValidCredentials_ReturnsToken() {
        // Arrange
        String email = "test@example.com";
        String password = "password";
        User user = new User();
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password));
        when(userRepository.findByEmail(email)).thenReturn(Optional.of(user));
        when(jwtTokenProvider.createToken(email, user.getRoles())).thenReturn("token");
        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class))).thenReturn(null);

        // Act
        String result = userService.login(email, password);

        // Assert
        assertNotNull(result);
        assertEquals("token", result);
        verify(authenticationManager, times(1)).authenticate(any(UsernamePasswordAuthenticationToken.class));
        verify(jwtTokenProvider, times(1)).createToken(email, user.getRoles());
    }

    @Test
    public void testRegister_NewUser_ReturnsToken() {
        // Arrange
        String email = "test@example.com";
        String password = "password";
        User user = new User();
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password));
        when(userRepository.existsByEmail(email)).thenReturn(false);
        when(jwtTokenProvider.createToken(email, user.getRoles())).thenReturn("token");

        // Act
        String result = userService.register(user);

        // Assert
        assertNotNull(result);
        assertEquals("token", result);
        verify(userRepository, times(1)).existsByEmail(email);
        verify(userRepository, times(1)).save(user);
        verify(jwtTokenProvider, times(1)).createToken(email, user.getRoles());
    }

    @Test
    public void testRegister_ExistingEmail_ThrowsAuthException() {
        // Arrange
        String email = "test@example.com";
        User user = new User();
        user.setEmail(email);
        when(userRepository.existsByEmail(email)).thenReturn(true);

        // Act & Assert
        assertThrows(AuthException.class, () -> userService.register(user));
        verify(userRepository, times(1)).existsByEmail(email);
        verify(userRepository, never()).save(any(User.class));
        verify(jwtTokenProvider, never()).createToken(anyString(), any());
    }

    @Test
    public void testGetUserById_ExistingId_ReturnsUser() {
        // Arrange
        Integer id = 1;
        User user = new User();
        when(userRepository.findById(id)).thenReturn(Optional.of(user));

        // Act
        Optional<User> result = userService.getUserById(id);

        // Assert
        assertTrue(result.isPresent());
        assertEquals(user, result.get());
        verify(userRepository, times(1)).findById(id);
    }

    @Test
    public void testGetUserById_NonExistingId_ReturnsEmptyOptional() {
        // Arrange
        Integer id = 1;
        when(userRepository.findById(id)).thenReturn(Optional.empty());

        // Act
        Optional<User> result = userService.getUserById(id);

        // Assert
        assertFalse(result.isPresent());
        verify(userRepository, times(1)).findById(id);
    }

    @Test
    public void testValidateUser_ExistingEmail_ReturnsTrue() {
        // Arrange
        String email = "test@example.com";
        when(userRepository.existsByEmail(email)).thenReturn(true);

        // Act
        boolean result = userService.validateUser(email);

        // Assert
        assertTrue(result);
        verify(userRepository, times(1)).existsByEmail(email);
    }

    @Test
    public void testValidateUser_NonExistingEmail_ReturnsFalse() {
        // Arrange
        String email = "test@example.com";
        when(userRepository.existsByEmail(email)).thenReturn(false);

        // Act
        boolean result = userService.validateUser(email);

        // Assert
        assertFalse(result);
        verify(userRepository, times(1)).existsByEmail(email);
    }

    @Test
    public void testDelete_ValidEmail_DeletesUser() {
        // Arrange
        String email = "test@example.com";

        // Act
        userService.delete(email);

        // Assert
        verify(userRepository, times(1)).deleteByEmail(email);
    }

    @Test
    public void testGetUserByEmail_ExistingEmail_ReturnsUser() {
        // Arrange
        String email = "test@example.com";
        User user = new User();
        when(userRepository.findByEmail(email)).thenReturn(Optional.of(user));

        // Act
        Optional<User> result = userService.getUserByEmail(email);

        // Assert
        assertTrue(result.isPresent());
        assertEquals(user, result.get());
        verify(userRepository, times(1)).findByEmail(email);
    }

    @Test
    public void testGetUserByEmail_NonExistingEmail_ReturnsEmptyOptional() {
        // Arrange
        String email = "test@example.com";
        when(userRepository.findByEmail(email)).thenReturn(Optional.empty());

        // Act
        Optional<User> result = userService.getUserByEmail(email);

        // Assert
        assertFalse(result.isPresent());
        verify(userRepository, times(1)).findByEmail(email);
    }

    @Test
    public void testExists_ExistingEmail_ReturnsTrue() {
        // Arrange
        String email = "test@example.com";
        when(userRepository.existsByEmail(email)).thenReturn(true);

        // Act
        boolean result = userService.exists(email);

        // Assert
        assertTrue(result);
        verify(userRepository, times(1)).existsByEmail(email);
    }

    @Test
    public void testExists_NonExistingEmail_ReturnsFalse() {
        // Arrange
        String email = "test@example.com";
        when(userRepository.existsByEmail(email)).thenReturn(false);

        // Act
        boolean result = userService.exists(email);

        // Assert
        assertFalse(result);
        verify(userRepository, times(1)).existsByEmail(email);
    }

    @Test
    public void testGetUser_ExistingEmail_ReturnsUser() {
        // Arrange
        String email = "test@example.com";
        User user = new User();
        when(userRepository.findByEmail(email)).thenReturn(Optional.of(user));

        // Act
        Object result = userService.getUser(email);

        // Assert
        assertNotNull(result);
        verify(userRepository, times(1)).findByEmail(email);
    }

    @Test
    public void testGetUser_NonExistingEmail_ReturnsNull() {
        // Arrange
        String email = "test@example.com";
        when(userRepository.findByEmail(email)).thenReturn(Optional.empty());

        // Act
        Object result = userService.getUser(email);

        // Assert
        assertEquals(Optional.empty(), result);
        verify(userRepository, times(1)).findByEmail(email);
    }
}
