
CREATE POLICY "Anyone can delete messages"
  ON public.visitor_messages
  FOR DELETE
  TO anon, authenticated
  USING (true);

ALTER PUBLICATION supabase_realtime ADD TABLE public.visitor_messages;
