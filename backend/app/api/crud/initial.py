from sqlalchemy.orm import Session
from sqlalchemy.sql.expression import func
from app.models.countries import Country
from app.models.certificates import Certificate
from app.models.expertises import Expertise
from app.models.users import User
from app.schemas.mentoringTypes import MentoringType
from app.models.certificates import Certificate
from app.models.expertises import Expertise
from app.models.mentors import Mentor
from app.models.mentees import Mentee
from app.models.matches import Match
from app.models.expertises import Expertise
from app.models.users import User

from app.api.crud.users import get_users
from app.api.crud.mentors import get_mentors
from app.api.crud.mentees import get_mentees
from app.api.crud.mentees_expertises import add_mentee_expertises
from app.api.crud.mentors_expertises import add_mentor_expertises

import pycountry
from faker import Faker
import bcrypt
import random


fake = Faker("de_DE")


def load_initial_countries(db: Session):
    countries = pycountry.countries

    for country in countries:
        db_country = Country(name=country.name, code=country.alpha_2)
        db.add(db_country)

    db.commit()
    db.refresh(db_country)
    return db_country


def load_initial_certificates(db: Session):
    certificates = [
        "Angewandtes Informationsmanagement",
        "Angewandte Informatik",
        "Angewandte Mathematik",
        "Bereitschaft",
    ]

    for certificate in certificates:
        db_certificate = Certificate(name=certificate)
        db.add(db_certificate)

    db.commit()
    db.refresh(db_certificate)


def load_initial_expertises(db: Session):
    expertises = [
        "Web Development",
        "Cooking",
        "Data Science",
        "Design",
        "3D Modelling",
        "Artificial Intelligence",
        "Machine Learning",
        "Mobile App Development",
        "Photography",
        "Videography",
        "Graphic Design",
        "Marketing",
        "Sales",
        "Public Speaking",
        "Entrepreneurship",
        "Project Management",
        "Product Management",
        "Cybersecurity",
        "Networking",
        "Software Engineering",
        "Game Development",
        "Animation",
        "Virtual Reality",
        "Augmented Reality",
        "User Experience Design",
        "User Interface Design",
        "Copywriting",
        "Content Creation",
        "Social Media Management",
        "Digital Marketing",
        "Search Engine Optimization",
        "Public Relations",
        "Human Resources",
        "Talent Acquisition",
        "Finance",
        "Investing",
        "Real Estate",
        "Personal Development",
        "Leadership",
        "Mental Health",
        "Physical Fitness",
        "Nutrition",
        "Yoga",
        "Meditation",
        "Life Coaching",
        "Career Coaching",
        "Education",
        "Teaching",
        "Music Production",
        "Music Theory",
        "Instrument Instruction",
        "Singing",
        "Voice Acting",
        "Performing Arts",
        "Visual Arts",
        "Painting",
        "Sculpture",
        "Ceramics",
        "Creative Writing",
        "Journalism",
        "Podcasting",
        "Radio Broadcasting",
        "Television Production",
        "Event Planning",
        "Travel Planning",
        "Language Learning",
        "Translation",
        "Cultural Competency",
        "Fashion",
        "Interior Design",
        "Landscape Architecture",
        "Gardening",
        "Urban Planning",
        "Environmental Science",
        "Sustainability",
        "Renewable Energy",
        "Automotive Repair",
        "Woodworking",
        "Electronics",
        "Robotics",
        "Astronomy",
        "Astrophysics",
        "Biology",
        "Chemistry",
        "Physics",
        "Mathematics",
        "History",
        "Geography",
        "Political Science",
        "Sociology",
        "Anthropology",
        "Psychology",
        "Philosophy",
        "Ethics",
        "Religion",
        "Theology",
        "Mythology",
        "Archaeology",
        "Genealogy",
        "Dance",
        "Martial Arts",
        "Sports Coaching",
        "Personal Training",
        "Parenting",
        "Pet Training",
        "Veterinary Medicine",
        "Medical Sciences",
        "Nursing",
        "Dentistry",
        "Pharmacy",
        "Physiotherapy",
        "Occupational Therapy",
        "Speech Therapy",
        "Audiology",
        "Optometry",
        "Dietetics",
        "Social Work",
        "Counseling",
        "Legal Studies",
        "Criminal Justice",
        "Forensics",
        "Library Science",
        "Archival Studies",
        "Museum Studies",
        "Culinary Arts",
        "Baking",
        "Brewing",
        "Winemaking",
        "Distilling",
        "Hospitality",
        "Tourism",
        "Event Management",
        "Agriculture",
        "Horticulture",
        "Animal Husbandry",
        "Beekeeping",
        "Aquaculture",
        "Fisheries",
        "Wildlife Conservation",
        "Marine Biology",
        "Meteorology",
        "Geology",
        "Oceanography",
        "Cartography",
        "Remote Sensing",
        "Geospatial Analysis",
        "GIS",
        "Hydrology",
        "Soil Science",
        "Biochemistry",
        "Microbiology",
        "Genetics",
        "Immunology",
        "Pharmacology",
        "Toxicology",
        "Neuroscience",
        "Zoology",
        "Botany",
        "Paleontology",
        "Mineralogy",
        "Materials Science",
        "Nanotechnology",
        "Chemical Engineering",
        "Biomedical Engineering",
        "Civil Engineering",
        "Structural Engineering",
        "Environmental Engineering",
        "Geotechnical Engineering",
        "Transportation Engineering",
        "Electrical Engineering",
        "Electronics Engineering",
        "Computer Engineering",
        "Mechanical Engineering",
        "Aerospace Engineering",
        "Aeronautical Engineering",
        "Naval Architecture",
        "Marine Engineering",
        "Industrial Engineering",
        "Systems Engineering",
        "Manufacturing Engineering",
        "Textile Engineering",
        "Petroleum Engineering",
        "Mining Engineering",
        "Metallurgical Engineering",
        "Construction Management",
        "Urban Design",
        "Actuarial Science",
        "Risk Management",
        "Insurance",
        "Economics",
        "Accounting",
        "Auditing",
        "Taxation",
        "Banking",
        "Financial Planning",
        "Corporate Finance",
        "International Business",
        "Management",
        "Operations Management",
        "Supply Chain Management",
        "Logistics",
        "Procurement",
        "Quality Management",
        "E-Commerce",
        "Information Systems",
        "Database Administration",
        "Network Administration",
        "IT Security",
        "IT Service Management",
        "Computer Forensics",
        "Business Analysis",
        "Technical Writing",
        "Instructional Design",
        "Training",
        "Conflict Resolution",
        "Negotiation",
        "Diversity and Inclusion",
        "Time Management",
        "Stress Management",
        "Problem Solving",
        "Critical Thinking",
        "Emotional Intelligence",
        "Communication",
        "Interpersonal Skills",
        "Team Building",
        "Customer Service",
        "Community Engagement",
        "Nonprofit Management",
        "Fundraising",
        "Grant Writing",
        "Volunteer Management",
        "Ethnography",
        "Linguistics",
        "Semiotics",
        "Film Studies",
        "Theater",
        "Screenwriting",
        "Film Production",
        "Film Editing",
        "Cinematography",
        "Storyboarding",
        "Set Design",
        "Costume Design",
        "Makeup Artistry",
        "Special Effects",
        "Sound Design",
        "Video Editing",
        "Color Grading",
        "Motion Graphics",
        "Typography",
        "Branding",
        "Illustration",
        "Packaging Design",
        "Printmaking",
        "Jewelry Design",
        "Fashion Design",
        "Patternmaking",
        "Sewing",
        "Knitting",
        "Crocheting",
        "Embroidery",
        "Quilting",
        "Leatherworking",
        "Glassblowing",
        "Blacksmithing",
        "Metalworking",
        "Engraving",
        "Pottery",
        "Stained Glass",
        "Calligraphy",
        "Hand Lettering",
        "Origami",
        "Papermaking",
        "Bookbinding",
        "Comic Art",
        "Graphic Novels",
        "Manga",
        "Animation",
        "Anime",
        "Storyboarding",
        "Character Design",
        "Environment Design",
        "Prop Design",
        "Game Design",
        "Level Design",
        "Game Programming",
        "Game Art",
        "Game Audio",
        "Game QA",
        "Game Localization",
        "Game Marketing",
        "Game Community Management",
        "Tabletop Game Design",
        "Board Game Design",
        "Card Game Design",
        "Role-Playing Game Design",
        "Improv",
        "Stand-Up Comedy",
        "Sketch Comedy",
        "Puppetry",
        "Circus Arts",
        "Juggling",
        "Acrobatics",
        "Aerial Arts",
        "Magic",
        "Mime",
        "Clowning",
        "Poetry",
        "Short Story Writing",
        "Novel Writing",
        "Playwriting",
        "Screenwriting",
        "Nonfiction Writing",
        "Biography Writing",
        "Memoir Writing",
        "Travel Writing",
        "Food Writing",
        "Sports Writing",
        "Technical Writing",
        "Medical Writing",
        "Scientific Writing",
        "Grant Writing",
        "Speech Writing",
        "Editing",
        "Proofreading",
        "Publishing",
        "Self-Publishing",
        "Literary Criticism",
        "Book Marketing",
        "Book Promotion",
        "Creative Nonfiction",
        "Essay Writing",
        "Blogging",
        "Vlogging",
        "Livestreaming",
        "Influencer Marketing",
        "Affiliate Marketing",
        "Email Marketing",
        "Conversion Optimization",
        "Web Analytics",
        "App Store Optimization",
        "Mobile Marketing",
        "Video Marketing",
        "Content Marketing",
        "Guerilla Marketing",
        "Sports Management",
        "Sports Marketing",
        "Sports Nutrition",
        "Strength and Conditioning",
        "Physical Therapy",
        "Athletic Training",
        "Sports Psychology",
        "Motorsports",
        "Outdoor Recreation",
        "Adventure Sports",
        "Scuba Diving",
        "Rock Climbing",
        "Mountaineering",
        "Hiking",
        "Backpacking",
        "Camping",
        "Bushcraft",
        "Survival Skills",
        "Navigation",
        "Orienteering",
        "Cartography",
        "Mapmaking",
        "Geocaching",
        "Astronomy",
        "Astrology",
        "Alternative Medicine",
        "Herbalism",
        "Aromatherapy",
        "Homeopathy",
        "Naturopathy",
        "Ayurveda",
        "Traditional Chinese Medicine",
        "Acupuncture",
        "Massage Therapy",
        "Reflexology",
        "Reiki",
        "Hypnotherapy",
        "Feng Shui",
        "I Ching",
        "Tarot",
        "Numerology",
        "Palmistry",
        "Runes",
        "Crystal Healing",
        "Dream Interpretation",
        "Meditation",
        "Mindfulness",
        "Spirituality",
        "Chakra Healing",
        "Yoga",
        "Pilates",
        "Barre",
        "Functional Training",
        "CrossFit",
        "Aerobics",
        "Zumba",
        "Dance Fitness",
        "Water Aerobics",
        "Swimming",
        "Cycling",
        "Running",
        "Marathon Training",
        "Triathlon Training",
        "Endurance Sports",
        "Trail Running",
        "Ultramarathon Training",
        "Track and Field",
        "Racewalking",
        "Snowboarding",
        "Skiing",
        "Ice Skating",
        "Figure Skating",
        "Hockey",
        "Curling",
        "Sledding",
        "Bobsledding",
    ]
    for expertise in expertises:
        db_expertise = Expertise(name=expertise)
        db.add(db_expertise)

    db.commit()
    db.refresh(db_expertise)


def load_initial_users(db: Session):
    salt = bcrypt.gensalt()
    hashed_password = bcrypt.hashpw("test123".encode("utf-8"), salt)
    hashed_password_hex = hashed_password.hex()

    countries = pycountry.countries

    for i in range(0, 50):
        gender = random.choice(["men", "women"])
        first_name = (
            fake.first_name_male() if gender == "men" else fake.first_name_female()
        )
        last_name = fake.last_name()
        profile_picture_url = f"https://randomuser.me/api/portraits/{gender}/{i}.jpg"
        age = random.randint(18, 80)

        db_user = User(
            first_name=first_name,
            last_name=last_name,
            age=age,
            gender=random.choice(["male", "female", "diverse"]),
            email=f"{i}.{i+1}@test.com",
            hashed_password=hashed_password_hex,
            salt=salt,
            bio=f"Hello my name is {first_name} {last_name} and I am a here to learn!",
            country_code=list(countries)[i + 1].alpha_2,
            job_title=fake.job(),
            company=fake.company(),
            rating = random.randint(0,5),
            profile_picture=profile_picture_url,
        )
        db.add(db_user)
    db.commit()
    db.refresh(db_user)


def generate_availability_text():
    days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
    availability_text = ""
    for day in days:
        start_hour = random.randint(8, 16)
        end_hour = start_hour + random.randint(1, 6)
        availability_text += f"{day}: {start_hour}:00 - {end_hour}:00\n"
    return availability_text.strip()


def generate_personalized_description(user: User, mentee: bool, db: Session):
    intro = f"My name is {user.first_name} {user.last_name}, and I'm a {user.job_title} at {user.company}."

    if mentee:
        reason = "I joined this platform to find a mentor and accelerate my learning journey."
    else:
        reason = "I joined this platform to share my knowledge and help others in their learning journey."

    # Query random expertises from the database
    expertises = db.query(Expertise).order_by(func.random()).limit(6).all()
    interests = f"My interests include {', '.join([expertise.name for expertise in expertises])}."

    if mentee:
        expectations = "I'm looking forward to connecting with mentors who can guide me and help me grow."
    else:
        expectations = "I'm looking forward to connecting with mentees who are eager to learn and grow."

    return f"{intro} {reason} {interests} {expectations}"


def load_initial_mentees(db: Session):
    my_users = get_users(db)

    for i in range(10, 25):
        user = my_users[i]
        mentoring_type = random.choice(list(MentoringType))
        availability = generate_availability_text()
        years_of_experience = random.randint(1, 10)
        description = generate_personalized_description(user, True, db)
        rating = round(random.uniform(1, 5), 1)
        linked_in = (
            f"https://www.linkedin.com/in/{user.first_name.lower()}_{user.last_name.lower()}/"
            if random.random() < 0.7
            else None
        )

        mentee = Mentee(
            user_id=user.id,
            mentoring_type=mentoring_type,
            availability=availability,
            years_of_experience=years_of_experience,
            description=description,
            rating=rating,
            linked_in=linked_in,
        )

        db.add(mentee)
    db.commit()
    db.refresh(mentee)

def load_initial_mentees_expertises(db: Session):
    mentees = db.query(Mentee).all()
    
    expertises = db.query(Expertise).all()
    
    for mentee in mentees:
        random_expertises = random.sample(expertises, 10)
        random_expertise_ids = [expertise.id for expertise in random_expertises]
        add_mentee_expertises(db, mentee.id, random_expertise_ids)


def load_initial_mentors(db: Session):
    my_users = get_users(db)

    for i in range(25, 49):
        mentoring_type = random.choice(list(MentoringType))
        availability = generate_availability_text()
        years_of_experience = random.randint(1, 30)
        description = generate_personalized_description(my_users[i], False, db)
        rating = round(random.uniform(1, 5), 1)
        linked_in = (
            f"https://www.linkedin.com/in/{my_users[i].first_name.lower()}_{my_users[i].last_name.lower()}/"
            if random.random() < 0.7
            else None
        )

        mentor = Mentor(
            user_id=my_users[i].id,
            mentoring_type=mentoring_type,
            availability=availability,
            years_of_experience=years_of_experience,
            description=description,
            rating=rating,
            linked_in=linked_in,
        )

        my_users[i].is_mentor = True
        db.add(mentor)
    db.commit()
    db.refresh(mentor)

def load_initial_mentors_expertises(db: Session):
    mentors = db.query(Mentor).all()
    
    expertises = db.query(Expertise).all()
    
    for mentor in mentors:
        random_expertises = random.sample(expertises, 10)
        random_expertise_ids = [expertise.id for expertise in random_expertises]
        add_mentor_expertises(db, mentor.id, random_expertise_ids)

def load_initial_matches(db: Session, num_matches: int):
    # Fetch all mentors and mentees
    all_mentors = get_mentors(db)
    all_mentees = get_mentees(db)

    # Create matches
    matches = set()
    statuses = ["active", "pending", "rejected", "ended"]

    while len(matches) < num_matches:
        mentor = random.choice(all_mentors)
        mentee = random.choice(all_mentees)
        random_status = random.choice(statuses)

        # Check if the match between the selected mentor and mentee already exists
        existing_match = (
            db.query(Match)
            .filter(Match.mentor_id == mentor.id, Match.mentee_id == mentee.id)
            .first()
        )

        if existing_match:
            # Retry the current iteration if the match already exists
            continue

        match = Match(mentor_id=mentor.id, mentee_id=mentee.id, status=random_status)

        # Check if the match is already in the matches set
        if not any(
            existing_match.mentor_id == match.mentor_id
            and existing_match.mentee_id == match.mentee_id
            for existing_match in matches
        ):
            matches.add(match)

    # Save the matches to the database
    for match in matches:
        db.add(match)
    db.commit()


def load_initial_data(db: Session):
    load_initial_countries(db)
    load_initial_certificates(db)
    load_initial_expertises(db)
    load_initial_users(db)
    load_initial_mentees(db)
    load_initial_mentees_expertises(db)
    load_initial_mentors(db)
    load_initial_mentors_expertises(db)
    load_initial_matches(db, 300)
