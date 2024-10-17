package com.ishaan.project.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ishaan.project.entities.Token;

import jakarta.transaction.Transactional;

public interface TokenRepository extends JpaRepository<Token, Integer> {

	@Query(value = """
			select t from Token t inner join User u\s
			on t.user.id = u.id\s
			where u.id = :id and (t.expired = false or t.revoked = false)\s
			""")
	List<Token> findAllValidTokenByUser(Integer id);

	Optional<Token> findByToken(String token);

	@Modifying
	@Transactional
	@Query("DELETE FROM Token t WHERE t.user.userID = :userId")
	void deleteByUserId(@Param("userId") Integer userId);

}
