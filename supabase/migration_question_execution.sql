-- Optional execution metadata for questions (function name + per-language stubs)
ALTER TABLE questions ADD COLUMN IF NOT EXISTS function_name text;
ALTER TABLE questions ADD COLUMN IF NOT EXISTS starter_code jsonb;

-- Example override for Two Sum (optional — harness infers from title when null)
-- UPDATE questions SET function_name = 'twoSum' WHERE title = 'Two Sum';
