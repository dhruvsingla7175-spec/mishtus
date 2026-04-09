
-- Add image_url column
ALTER TABLE public.visitor_messages ADD COLUMN image_url text;

-- Create storage bucket
INSERT INTO storage.buckets (id, name, public) VALUES ('message-attachments', 'message-attachments', true);

-- Public read access
CREATE POLICY "Anyone can view message attachments"
ON storage.objects FOR SELECT
USING (bucket_id = 'message-attachments');

-- Anyone can upload
CREATE POLICY "Anyone can upload message attachments"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'message-attachments');
