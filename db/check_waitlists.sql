select users.id, users.user_name, email, from users 
join waitlist on waitlist.user_id = users.id 
join make on make.id = waitlist.make
join model on model.id = waitlist.model
join year on year.id = waitlist.year
join color on color.id = waitlist.color
where color.color = 'Black'
and make.make = 'Dodge'
and model.model = 'Challenger'
and year.year = 2018