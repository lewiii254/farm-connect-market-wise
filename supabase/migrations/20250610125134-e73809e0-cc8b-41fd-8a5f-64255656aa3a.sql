
-- Add mpesa_receipt_number column to mpesa_transactions table
ALTER TABLE mpesa_transactions 
ADD COLUMN IF NOT EXISTS mpesa_receipt_number text,
ADD COLUMN IF NOT EXISTS transaction_date text;

-- Add index for faster lookups
CREATE INDEX IF NOT EXISTS idx_mpesa_transactions_receipt_number 
ON mpesa_transactions(mpesa_receipt_number);

CREATE INDEX IF NOT EXISTS idx_mpesa_transactions_status 
ON mpesa_transactions(status);
