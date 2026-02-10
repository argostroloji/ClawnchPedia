
-- Add status column with default 'pending'
alter table public.registry 
add column status text not null default 'pending' 
check (status in ('pending', 'verified', 'rejected'));

-- Update existing entries to 'verified' (since they were created by us/test)
update public.registry set status = 'verified' where status = 'pending';
