package io.github.macbernic.blogapp.repository;

import io.github.macbernic.blogapp.domain.BlogEntryComment;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the BlogEntryComment entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BlogEntryCommentRepository extends JpaRepository<BlogEntryComment, Long> {

    @Query("select blog_entry_comment from BlogEntryComment blog_entry_comment where blog_entry_comment.writtenBy.login = ?#{principal.username}")
    List<BlogEntryComment> findByWrittenByIsCurrentUser();

}
