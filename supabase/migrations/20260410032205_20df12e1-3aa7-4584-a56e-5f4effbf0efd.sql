CREATE POLICY "Anyone can update messages"
ON public.visitor_messages
FOR UPDATE
USING (true)
WITH CHECK (true);