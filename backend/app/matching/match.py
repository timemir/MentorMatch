from .utility import availability_score


def match(mentee, mentor, weights):
    def safe_divide(x, y):
        return x / y if y != 0 else 0

    # Skills match
    mentee_expertises = {expertise['id'] for expertise in mentee['expertises']}
    mentor_expertises = {expertise['id'] for expertise in mentor['expertises']}
    skill_match = safe_divide(
        len(mentee_expertises.intersection(mentor_expertises)),
        len(mentee_expertises),
    )

    # Experience match
    experience_difference_percentage = safe_divide(
        abs(mentee['years_of_experience'] - mentor['years_of_experience']),
        (mentee['years_of_experience'] + mentor['years_of_experience']),
    )
    experience_match = 1 - experience_difference_percentage

    # Availability match
    if mentee['availability'] and mentor['availability']:
        availability_match = availability_score(mentee['availability'], mentor['availability'])
    else:
        availability_match = 0
        
    # Mentoring type match
    mentoring_type_match = (
        int(mentee['mentoring_type'] == mentor['mentoring_type'])
        if mentee['mentoring_type'] and mentor['mentoring_type']
        else 0
    )

    # Country match
    country_match = (
        int(mentee['user']['country_code'] == mentor['user']['country_code'])
        if mentee['user']['country_code'] and mentor['user']['country_code']
        else 0
    )

    # Age match
    age_difference_percentage = safe_divide(
        abs(mentee['user']['age'] - mentor['user']['age']),
        (mentee['user']['age'] + mentor['user']['age']),
    )
    age_match = 1 - age_difference_percentage

    # Gender match
    gender_match = (
        int(mentee['user']['gender'] == mentor['user']['gender'])
        if mentee['user']['gender'] and mentor['user']['gender']
        else 0
    )

    # Rating match
    rating_match = mentor['rating'] / 5 if mentor['rating'] else 0

    score = (
        skill_match * weights["skills"]
        + experience_match * weights["experience"]
        + availability_match * weights["availability"]
        + mentoring_type_match * weights["mentoring_type"]
        + country_match * weights["country"]
        + age_match * weights["age"]
        + gender_match * weights["gender"]
        + rating_match * weights["rating"]
    )

    return score

