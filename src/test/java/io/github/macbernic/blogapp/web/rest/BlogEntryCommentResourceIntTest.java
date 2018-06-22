package io.github.macbernic.blogapp.web.rest;

import io.github.macbernic.blogapp.BlogHipsterApp;

import io.github.macbernic.blogapp.domain.BlogEntryComment;
import io.github.macbernic.blogapp.repository.BlogEntryCommentRepository;
import io.github.macbernic.blogapp.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Base64Utils;

import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;


import static io.github.macbernic.blogapp.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the BlogEntryCommentResource REST controller.
 *
 * @see BlogEntryCommentResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = BlogHipsterApp.class)
public class BlogEntryCommentResourceIntTest {

    private static final String DEFAULT_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_TITLE = "BBBBBBBBBB";

    private static final String DEFAULT_CONTENT = "AAAAAAAAAA";
    private static final String UPDATED_CONTENT = "BBBBBBBBBB";

    private static final Instant DEFAULT_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private BlogEntryCommentRepository blogEntryCommentRepository;


    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restBlogEntryCommentMockMvc;

    private BlogEntryComment blogEntryComment;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final BlogEntryCommentResource blogEntryCommentResource = new BlogEntryCommentResource(blogEntryCommentRepository);
        this.restBlogEntryCommentMockMvc = MockMvcBuilders.standaloneSetup(blogEntryCommentResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static BlogEntryComment createEntity(EntityManager em) {
        BlogEntryComment blogEntryComment = new BlogEntryComment()
            .title(DEFAULT_TITLE)
            .content(DEFAULT_CONTENT)
            .date(DEFAULT_DATE);
        return blogEntryComment;
    }

    @Before
    public void initTest() {
        blogEntryComment = createEntity(em);
    }

    @Test
    @Transactional
    public void createBlogEntryComment() throws Exception {
        int databaseSizeBeforeCreate = blogEntryCommentRepository.findAll().size();

        // Create the BlogEntryComment
        restBlogEntryCommentMockMvc.perform(post("/api/blog-entry-comments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(blogEntryComment)))
            .andExpect(status().isCreated());

        // Validate the BlogEntryComment in the database
        List<BlogEntryComment> blogEntryCommentList = blogEntryCommentRepository.findAll();
        assertThat(blogEntryCommentList).hasSize(databaseSizeBeforeCreate + 1);
        BlogEntryComment testBlogEntryComment = blogEntryCommentList.get(blogEntryCommentList.size() - 1);
        assertThat(testBlogEntryComment.getTitle()).isEqualTo(DEFAULT_TITLE);
        assertThat(testBlogEntryComment.getContent()).isEqualTo(DEFAULT_CONTENT);
        assertThat(testBlogEntryComment.getDate()).isEqualTo(DEFAULT_DATE);
    }

    @Test
    @Transactional
    public void createBlogEntryCommentWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = blogEntryCommentRepository.findAll().size();

        // Create the BlogEntryComment with an existing ID
        blogEntryComment.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restBlogEntryCommentMockMvc.perform(post("/api/blog-entry-comments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(blogEntryComment)))
            .andExpect(status().isBadRequest());

        // Validate the BlogEntryComment in the database
        List<BlogEntryComment> blogEntryCommentList = blogEntryCommentRepository.findAll();
        assertThat(blogEntryCommentList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = blogEntryCommentRepository.findAll().size();
        // set the field null
        blogEntryComment.setDate(null);

        // Create the BlogEntryComment, which fails.

        restBlogEntryCommentMockMvc.perform(post("/api/blog-entry-comments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(blogEntryComment)))
            .andExpect(status().isBadRequest());

        List<BlogEntryComment> blogEntryCommentList = blogEntryCommentRepository.findAll();
        assertThat(blogEntryCommentList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllBlogEntryComments() throws Exception {
        // Initialize the database
        blogEntryCommentRepository.saveAndFlush(blogEntryComment);

        // Get all the blogEntryCommentList
        restBlogEntryCommentMockMvc.perform(get("/api/blog-entry-comments?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(blogEntryComment.getId().intValue())))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE.toString())))
            .andExpect(jsonPath("$.[*].content").value(hasItem(DEFAULT_CONTENT.toString())))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())));
    }
    

    @Test
    @Transactional
    public void getBlogEntryComment() throws Exception {
        // Initialize the database
        blogEntryCommentRepository.saveAndFlush(blogEntryComment);

        // Get the blogEntryComment
        restBlogEntryCommentMockMvc.perform(get("/api/blog-entry-comments/{id}", blogEntryComment.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(blogEntryComment.getId().intValue()))
            .andExpect(jsonPath("$.title").value(DEFAULT_TITLE.toString()))
            .andExpect(jsonPath("$.content").value(DEFAULT_CONTENT.toString()))
            .andExpect(jsonPath("$.date").value(DEFAULT_DATE.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingBlogEntryComment() throws Exception {
        // Get the blogEntryComment
        restBlogEntryCommentMockMvc.perform(get("/api/blog-entry-comments/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateBlogEntryComment() throws Exception {
        // Initialize the database
        blogEntryCommentRepository.saveAndFlush(blogEntryComment);

        int databaseSizeBeforeUpdate = blogEntryCommentRepository.findAll().size();

        // Update the blogEntryComment
        BlogEntryComment updatedBlogEntryComment = blogEntryCommentRepository.findById(blogEntryComment.getId()).get();
        // Disconnect from session so that the updates on updatedBlogEntryComment are not directly saved in db
        em.detach(updatedBlogEntryComment);
        updatedBlogEntryComment
            .title(UPDATED_TITLE)
            .content(UPDATED_CONTENT)
            .date(UPDATED_DATE);

        restBlogEntryCommentMockMvc.perform(put("/api/blog-entry-comments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedBlogEntryComment)))
            .andExpect(status().isOk());

        // Validate the BlogEntryComment in the database
        List<BlogEntryComment> blogEntryCommentList = blogEntryCommentRepository.findAll();
        assertThat(blogEntryCommentList).hasSize(databaseSizeBeforeUpdate);
        BlogEntryComment testBlogEntryComment = blogEntryCommentList.get(blogEntryCommentList.size() - 1);
        assertThat(testBlogEntryComment.getTitle()).isEqualTo(UPDATED_TITLE);
        assertThat(testBlogEntryComment.getContent()).isEqualTo(UPDATED_CONTENT);
        assertThat(testBlogEntryComment.getDate()).isEqualTo(UPDATED_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingBlogEntryComment() throws Exception {
        int databaseSizeBeforeUpdate = blogEntryCommentRepository.findAll().size();

        // Create the BlogEntryComment

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restBlogEntryCommentMockMvc.perform(put("/api/blog-entry-comments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(blogEntryComment)))
            .andExpect(status().isBadRequest());

        // Validate the BlogEntryComment in the database
        List<BlogEntryComment> blogEntryCommentList = blogEntryCommentRepository.findAll();
        assertThat(blogEntryCommentList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteBlogEntryComment() throws Exception {
        // Initialize the database
        blogEntryCommentRepository.saveAndFlush(blogEntryComment);

        int databaseSizeBeforeDelete = blogEntryCommentRepository.findAll().size();

        // Get the blogEntryComment
        restBlogEntryCommentMockMvc.perform(delete("/api/blog-entry-comments/{id}", blogEntryComment.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<BlogEntryComment> blogEntryCommentList = blogEntryCommentRepository.findAll();
        assertThat(blogEntryCommentList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(BlogEntryComment.class);
        BlogEntryComment blogEntryComment1 = new BlogEntryComment();
        blogEntryComment1.setId(1L);
        BlogEntryComment blogEntryComment2 = new BlogEntryComment();
        blogEntryComment2.setId(blogEntryComment1.getId());
        assertThat(blogEntryComment1).isEqualTo(blogEntryComment2);
        blogEntryComment2.setId(2L);
        assertThat(blogEntryComment1).isNotEqualTo(blogEntryComment2);
        blogEntryComment1.setId(null);
        assertThat(blogEntryComment1).isNotEqualTo(blogEntryComment2);
    }
}
