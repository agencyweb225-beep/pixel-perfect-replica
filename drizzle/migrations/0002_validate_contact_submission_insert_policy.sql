ALTER POLICY "Anyone can send a contact message"
ON public.contact_submissions
TO anon, authenticated
WITH CHECK (
  char_length(btrim(full_name)) BETWEEN 1 AND 120
  AND char_length(email) BETWEEN 3 AND 255
  AND email = btrim(email)
  AND email ~ '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$'
  AND (phone IS NULL OR char_length(phone) <= 40)
  AND (company IS NULL OR char_length(company) <= 160)
  AND service IN ('Social Media Management', 'Content Creation', 'Social Media Strategy', 'Paid Advertising', 'Brand Development', 'Other')
  AND budget IN ('Under ৳10,000', '৳10,000–৳25,000', '৳25,000–৳50,000', '৳50,000–৳100,000', 'Above ৳100,000', 'Not sure yet')
  AND char_length(btrim(message)) BETWEEN 10 AND 4000
);
