# Input: Availability string, e.g. 
# Monday: 13:00 - 19:00\nTuesday: 11:00 - 17:00\nWednesday: 9:00 - 15:00\nThursday: 9:00 - 13:00\nFriday: 16:00 - 19:00
# Output: A dictionary of the availability, e.g.
# {Monday: (13, 19), Tuesday: (11, 17), Wednesday: (9, 15), Thursday: (9, 13), Friday: (16, 19)}
def parse_availability(availability_str):
    days = availability_str.split('\n')
    availability = {}

    for day in days:
        day, hours = day.split(': ')
        start_time, end_time = hours.split(' - ')
        start_time = int(start_time.split(':')[0])
        end_time = int(end_time.split(':')[0])
        availability[day] = (start_time, end_time)

    return availability

# Input: Two availability strings
# Output: Value between 0 and 1 representing the percentage of overlap 
#         between the two availability strings
def availability_score(mentee_availability, mentor_availability):
    # Parse availability strings into dictionaries
    # (key: day, value: (start_time, end_time)
    mentee_availability = parse_availability(mentee_availability)
    mentor_availability = parse_availability(mentor_availability)

    total_overlap = 0
    total_hours = 0

    for day, hours in mentee_availability.items():
        mentee_start, mentee_end = hours
        mentor_start, mentor_end = mentor_availability.get(day, (0, 0))

        # Calculate time overlap for this day
        overlap = max(0, min(mentee_end, mentor_end) - max(mentee_start, mentor_start))
        total_overlap += overlap
        total_hours += mentee_end - mentee_start

    return total_overlap / total_hours