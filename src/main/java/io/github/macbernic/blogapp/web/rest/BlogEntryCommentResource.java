package io.github.macbernic.blogapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.macbernic.blogapp.domain.BlogEntryComment;
import io.github.macbernic.blogapp.repository.BlogEntryCommentRepository;
import io.github.macbernic.blogapp.web.rest.errors.BadRequestAlertException;
import io.github.macbernic.blogapp.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing BlogEntryComment.
 */
@RestController
@RequestMapping("/api")
public class BlogEntryCommentResource {

    private final Logger log = LoggerFactory.getLogger(BlogEntryCommentResource.class);

    private static final String ENTITY_NAME = "blogEntryComment";

    private final BlogEntryCommentRepository blogEntryCommentRepository;

    public BlogEntryCommentResource(BlogEntryCommentRepository blogEntryCommentRepository) {
        this.blogEntryCommentRepository = blogEntryCommentRepository;
    }

    /**
     * POST  /blog-entry-comments : Create a new blogEntryComment.
     *
     * @param blogEntryComment the blogEntryComment to create
     * @return the ResponseEntity with status 201 (Created) and with body the new blogEntryComment, or with status 400 (Bad Request) if the blogEntryComment has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/blog-entry-comments")
    @Timed
    public ResponseEntity<BlogEntryComment> createBlogEntryComment(@Valid @RequestBody BlogEntryComment blogEntryComment) throws URISyntaxException {
        log.debug("REST request to save BlogEntryComment : {}", blogEntryComment);
        if (blogEntryComment.getId() != null) {
            throw new BadRequestAlertException("A new blogEntryComment cannot already have an ID", ENTITY_NAME, "idexists");
        }
        BlogEntryComment result = blogEntryCommentRepository.save(blogEntryComment);
        return ResponseEntity.created(new URI("/api/blog-entry-comments/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /blog-entry-comments : Updates an existing blogEntryComment.
     *
     * @param blogEntryComment the blogEntryComment to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated blogEntryComment,
     * or with status 400 (Bad Request) if the blogEntryComment is not valid,
     * or with status 500 (Internal Server Error) if the blogEntryComment couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/blog-entry-comments")
    @Timed
    public ResponseEntity<BlogEntryComment> updateBlogEntryComment(@Valid @RequestBody BlogEntryComment blogEntryComment) throws URISyntaxException {
        log.debug("REST request to update BlogEntryComment : {}", blogEntryComment);
        if (blogEntryComment.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        BlogEntryComment result = blogEntryCommentRepository.save(blogEntryComment);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, blogEntryComment.getId().toString()))
            .body(result);
    }

    /**
     * GET  /blog-entry-comments : get all the blogEntryComments.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of blogEntryComments in body
     */
    @GetMapping("/blog-entry-comments")
    @Timed
    public List<BlogEntryComment> getAllBlogEntryComments() {
        log.debug("REST request to get all BlogEntryComments");
        return blogEntryCommentRepository.findAll();
    }

    /**
     * GET  /blog-entry-comments/:id : get the "id" blogEntryComment.
     *
     * @param id the id of the blogEntryComment to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the blogEntryComment, or with status 404 (Not Found)
     */
    @GetMapping("/blog-entry-comments/{id}")
    @Timed
    public ResponseEntity<BlogEntryComment> getBlogEntryComment(@PathVariable Long id) {
        log.debug("REST request to get BlogEntryComment : {}", id);
        Optional<BlogEntryComment> blogEntryComment = blogEntryCommentRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(blogEntryComment);
    }

    /**
     * DELETE  /blog-entry-comments/:id : delete the "id" blogEntryComment.
     *
     * @param id the id of the blogEntryComment to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/blog-entry-comments/{id}")
    @Timed
    public ResponseEntity<Void> deleteBlogEntryComment(@PathVariable Long id) {
        log.debug("REST request to delete BlogEntryComment : {}", id);

        blogEntryCommentRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
