from fastapi import FastAPI, HTTPException, Depends, Query, status, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel, Field, EmailStr, constr
from sqlalchemy import (
    create_engine, Column, Integer, String, Numeric, Boolean, 
    ForeignKey, Date, func, UniqueConstraint, DateTime   # Added UniqueConstraint import
)
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.exc import IntegrityError, SQLAlchemyError
from sqlalchemy.orm import sessionmaker, relationship, Session
from passlib.context import CryptContext
from datetime import date, timedelta, datetime
from decimal import Decimal
from typing import Optional, Dict, Generator, Any, List, Literal
from fastapi import FastAPI
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
# Add these imports at the top
from sqlalchemy import inspect
import logging
import bcrypt
from sqlalchemy import and_, func
from fastapi import Query



app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Your React frontend URL
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

def test_db_connection():
    try:
        engine = create_engine(DATABASE_URL)
        with engine.connect() as connection:
            print("Successfully connected to PostgreSQL database!")
        return True
    except SQLAlchemyError as e:
        print(f"Error connecting to the database: {e}")
        return False

# Set up logging
logging.basicConfig(level=logging.INFO)
logging.getLogger('sqlalchemy.engine').setLevel(logging.INFO)

# Setup logging
logger = logging.getLogger(__name__)

# JWT Configuration
SECRET_KEY = "your-secret-key-here"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


# Database Dependency
def get_db() -> Generator[Session, Any, None]:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()



@app.get("/")
async def read_root():
    return {"message": "Welcome to the Finance Hive API!"}

@app.get("/favicon.ico")
async def favicon():
    return {"message": "No favicon available."}

# ... (rest of your existing code)

# Database Configuration
DATABASE_URL = "postgresql://postgres:Jaanu123@localhost/finance-hive"
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Standard interest rates
STANDARD_INTEREST_RATES: Dict[str, float] = {
    "daily": 0.05,
    "monthly": 0.5,
    "yearly": 5.0
}

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")
# Models
class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True, nullable=False)
    password_hash = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    firstname = Column(String, nullable=False)
    lastname = Column(String, nullable=False)
    dateofbirth = Column(Date, nullable=False)
    aadhar = Column(String(12), unique=True, nullable=False)
    phonenumber = Column(String(10), nullable=False)
    role = Column(String, nullable=False)
    
    
# Token creation function
def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

class Customer(Base):
    __tablename__ = "customers"
    id = Column(Integer, primary_key=True, index=True)
    customer_id = Column(Integer, unique=True, nullable=False)
    name = Column(String)
    username = Column(String)
    purpose = Column(String)
    amount = Column(Numeric(10, 2))
    interest_rate = Column(Numeric(5, 2))
    start_date = Column(Date)
    end_date = Column(Date, nullable=True)
    account_type = Column(String)
    gender = Column(String)
    phone_number = Column(String, unique=True)
    aadhar = Column(String, unique=True)
    lender = Column(Integer, ForeignKey("users.id"))
    
    transactions = relationship("Transaction", back_populates="customer", cascade="all, delete-orphan")
    
    __table_args__ = (
        UniqueConstraint('customer_id', 'lender', name='unique_customer_id_per_lender'),
    )



    # Add a composite unique constraint for customer_id and lender
    __table_args__ = (
        UniqueConstraint('customer_id', 'lender', name='unique_customer_id_per_lender'),
    )

class Transaction(Base):
    __tablename__ = "transactions"
    id = Column(Integer, primary_key=True, index=True)
    account_id = Column(Integer, ForeignKey("customers.id", ondelete="CASCADE"))
    transaction_date = Column(Date)
    amount = Column(Numeric(10, 2))
    transaction_type = Column(String)
    description = Column(String)
    
    customer = relationship("Customer", back_populates="transactions")


Base.metadata.create_all(bind=engine)

class Admin(Base):
    __tablename__ = "admins"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    mobile = Column(String(10), unique=True, nullable=False)
    email = Column(String, unique=True, nullable=False)
    gender = Column(String, nullable=False)  # Added gender column
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

# Pydantic Models (Schemas)

class CustomerCreate(BaseModel):
    name: str
    username: str
    purpose: str
    amount: float
    interest_rate: float
    start_date: date
    end_date: Optional[date]
    account_type: str
    gender: str
    phone_number: constr(pattern=r'^\d{10}$')
    aadhar: constr(pattern=r'^\d{12}$')
    
    class Config:
        from_attributes = True

class AdminCreate(BaseModel):
    name: constr(min_length=2, max_length=50)
    mobile: constr(pattern=r'^\d{10}$')
    email: EmailStr
    gender: str

    class Config:
        from_attributes = True
        


class AdminResponse(BaseModel):
    id: int
    name: str
    mobile: str
    email: str
    gender: str
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

class AdminUpdate(BaseModel):
    name: constr(min_length=2, max_length=50)
    mobile: constr(pattern=r'^\d{10}$')
    email: EmailStr



# Add to your Pydantic models
class TransactionCreate(BaseModel):
    account_id: int
    transaction_date: date
    amount: float
    transaction_type: str
    description: Optional[str] = None

    class Config:
        from_attributes = True
        
class UserCreate(BaseModel):
    username: constr(min_length=3, max_length=50)
    password: constr(min_length=8)
    email: EmailStr
    firstname: constr(min_length=2, max_length=50)
    lastname: constr(min_length=2, max_length=50)
    dateofbirth: date
    aadhar: constr(pattern=r'^\d{12}$')
    phonenumber: constr(pattern=r'^\d{10}$')
    role: str

    class Config:
        from_attributes = True



# Database Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
        
Base.metadata.create_all(bind=engine)

def get_db() -> Generator[Session, Any, None]:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
        
        # JWT token creation
def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

# Authentication dependency
# Authentication functions
def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

async def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Invalid credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get("sub")
        if user_id is None:
            raise credentials_exception
    except jwt.JWTError:
        raise credentials_exception

    user = db.query(User).filter(User.id == int(user_id)).first()
    if user is None:
        raise credentials_exception
    return user


def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt



# Exception Handlers
@app.exception_handler(SQLAlchemyError)
async def database_exception_handler(request: Any, exc: SQLAlchemyError) -> dict:
    return {"error": "Database error occurred", "detail": str(exc)}

# Routes
@app.options("/signup")
async def signup_options():
    return {"message": "OK"}

@app.post("/signup", status_code=status.HTTP_201_CREATED)
async def signup(user_data: UserCreate, db: Session = Depends(get_db)):
    """
    Handle user signup with proper validation and error handling
    """
    try:
        # Log the signup attempt
        logger.info(f"Signup attempt for username: {user_data.username}")

        # Validate unique constraints before creating user
        if db.query(User).filter(User.username == user_data.username).first():
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Username already registered"
            )
        
        if db.query(User).filter(User.email == user_data.email).first():
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already registered"
            )
        
        if db.query(User).filter(User.aadhar == user_data.aadhar).first():
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Aadhar number already registered"
            )

        # Create new user instance
        try:
            hashed_password = pwd_context.hash(user_data.password)
            db_user = User(
                username=user_data.username,
                password_hash=hashed_password,
                email=user_data.email,
                firstname=user_data.firstname,
                lastname=user_data.lastname,
                dateofbirth=user_data.dateofbirth,
                aadhar=user_data.aadhar,
                phonenumber=user_data.phonenumber,
                role=user_data.role
            )
            
            # Add and commit to database
            db.add(db_user)
            db.commit()
            db.refresh(db_user)
            
            logger.info(f"User created successfully: {user_data.username}")
            return {"message": "User created successfully"}

        except Exception as e:
            db.rollback()
            logger.error(f"Error during user creation: {str(e)}")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Error creating user"
            )

    except HTTPException as he:
        # Re-raise HTTP exceptions
        raise he
    except IntegrityError as ie:
        db.rollback()
        logger.error(f"Database integrity error: {str(ie)}")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Database integrity error. Please check your input."
        )
    except Exception as e:
        db.rollback()
        logger.error(f"Unexpected error during signup: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An unexpected error occurred: {str(e)}"
        )

# Update login route to match frontend
@app.post("/login")
async def login(email: str, password: str, role: str, db: Session = Depends(get_db)):
    try:
        # For admin login
        if role == 'admin':
            if email != "admin@financehive.com" or password != "admin123":
                raise HTTPException(
                    status_code=status.HTTP_401_UNAUTHORIZED,
                    detail="Invalid admin credentials"
                )
            # Create admin token
            access_token = create_access_token({
                "sub": "admin",
                "role": "admin",
                "is_admin": True
            })
            return {
                "message": "Login successful",
                "access_token": access_token,
                "token_type": "bearer",
                "user_id": 0,  # Admin has no user_id
                "username": "admin",
                "email": email,
                "role": "admin"
            }
            
        # For lender and borrower login
        user = db.query(User).filter(
            User.email == email,
            User.role == role
        ).first()
        
        if not user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid email or password"
            )

        if not pwd_context.verify(password, user.password_hash):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid email or password"
            )
        
        # Create user token
        access_token = create_access_token({
            "sub": str(user.id),
            "role": user.role,
            "is_admin": False
        })
        
        return {
            "message": "Login successful",
            "access_token": access_token,
            "token_type": "bearer",
            "user_id": user.id,
            "username": user.username,
            "email": user.email,
            "role": user.role
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Login error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal server error during login"
        )

@app.post("/customers")
async def add_customer(
    customer_data: CustomerCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    try:
        # Check unique constraints
        if db.query(Customer).filter(Customer.aadhar == customer_data.aadhar).first():
            raise HTTPException(status_code=400, detail="Customer with this Aadhar already exists")
        
        if db.query(Customer).filter(Customer.phone_number == customer_data.phone_number).first():
            raise HTTPException(status_code=400, detail="Customer with this phone number already exists")
        
        # Get the next customer_id
        max_id = db.query(func.max(Customer.customer_id)).scalar() or 0
        next_customer_id = max_id + 1
        
        # Create new customer with the generated customer_id
        customer_dict = customer_data.dict()
        customer_dict['customer_id'] = next_customer_id
        db_customer = Customer(**customer_dict, lender=current_user.id)
        
        db.add(db_customer)
        db.commit()
        db.refresh(db_customer)
        
        return {
            "message": "Customer added successfully",
            "customer_id": db_customer.customer_id
        }
    
    except HTTPException:
        raise
    except Exception as e:
        db.rollback()
        logger.error(f"Error adding customer: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/next-customer-id")
async def get_next_customer_id(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    try:
        # Get the maximum customer_id and add 1
        max_id = db.query(func.max(Customer.customer_id)).scalar() or 0
        next_id = max_id + 1
        
        return {"next_customer_id": next_id}
    except Exception as e:
        logger.error(f"Error generating customer ID: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail="Error generating customer ID"
        )

@app.get("/customers")
async def get_customers(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    try:
        customers = db.query(Customer).filter(Customer.lender == current_user.id).all()
        
        customers_list = []
        for customer in customers:
            customers_list.append({
                "id": customer.id,
            "name": customer.name,
            "username": customer.username,
            "customer_id": customer.customer_id,
            "amount": float(customer.amount),
            "account_type": customer.account_type,
            "purpose": customer.purpose,
            "interest_rate": float(customer.interest_rate),
            "start_date": customer.start_date,
            "end_date": customer.end_date,
            "gender": customer.gender,
            "phone_number": customer.phone_number
            })
        
        return {
            "customers": customers_list,
            "total": len(customers_list)
        }
    except Exception as e:
        logger.error(f"Error fetching customers: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error fetching customers: {str(e)}"
        )

@app.get("/customers/{customer_id}")
async def get_customer(
    customer_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    try:
        # Only fetch customer if it belongs to the current user
        customer = db.query(Customer).filter(
            Customer.customer_id == customer_id,
            Customer.lender_id == current_user.id
        ).first()
        
        if not customer:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Customer not found or access denied"
            )
            
        return {
            "id": customer.id,
            "name": customer.name,
            "username": customer.username,
            "customer_id": customer.customer_id,
            "amount": float(customer.amount),
            "account_type": customer.account_type,
            "purpose": customer.purpose,
            "interest_rate": float(customer.interest_rate),
            "start_date": customer.start_date,
            "end_date": customer.end_date,
            "gender": customer.gender,
            "phone_number": customer.phone_number
        }
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error fetching customer details: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error fetching customer details: {str(e)}"
        )


# Add this new endpoint
@app.post("/transactions")
async def add_transaction(
    transaction: TransactionCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    try:
        # Verify customer exists and belongs to current user
        customer = db.query(Customer).filter(
            Customer.id == transaction.account_id,
            Customer.lender == current_user.id
        ).first()
        
        if not customer:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Customer not found or access denied"
            )

        # Create new transaction
        db_transaction = Transaction(
            account_id=transaction.account_id,
            transaction_date=transaction.transaction_date,
            amount=transaction.amount,
            transaction_type=transaction.transaction_type,
            description=transaction.description or ""
        )

        # Update customer amount based on transaction type
        if transaction.transaction_type == "credit":
            customer.amount = Decimal(str(float(customer.amount) - transaction.amount))
        else:  # debit
            customer.amount = Decimal(str(float(customer.amount) + transaction.amount))

        try:
            db.add(db_transaction)
            db.commit()
            db.refresh(db_transaction)

            return {
                "message": "Transaction added successfully",
                "transaction_id": db_transaction.id,
                "updated_balance": float(customer.amount)
            }
        except SQLAlchemyError as e:
            db.rollback()
            logger.error(f"Database error while adding transaction: {str(e)}")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Error while processing transaction"
            )
            
    except HTTPException:
        raise
    except Exception as e:
        db.rollback()
        logger.error(f"Error adding transaction: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error adding transaction: {str(e)}"
        )


# Add this endpoint to your FastAPI code
@app.get("/gettransactions")
async def get_transactions_by_date(
    start_date: date,
    end_date: date,
    current_user: User = Depends(get_current_user),  # Add user authentication
    db: Session = Depends(get_db)
) -> dict:
    try:
        if start_date > end_date:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Start date must be before end date"
            )

        # Get all customers belonging to the current lender
        customer_ids = db.query(Customer.id)\
            .filter(Customer.lender == current_user.id)\
            .all()
        
        # Extract IDs from the result
        customer_ids = [id[0] for id in customer_ids]

        # Get transactions only for the current lender's customers
        transactions = db.query(Transaction)\
            .join(Customer, Transaction.account_id == Customer.id)\
            .filter(
                Transaction.transaction_date.between(start_date, end_date),
                Customer.lender == current_user.id  # Filter by current lender
            )\
            .all()
        
        # Serialize transactions manually
        transactions_list = [
            {
                "id": tx.id,
                "account_id": tx.account_id,
                "transaction_date": tx.transaction_date.isoformat(),
                "amount": float(tx.amount),
                "transaction_type": tx.transaction_type,
                "description": tx.description,
                "customer_name": tx.customer.name  # Add customer name to response
            }
            for tx in transactions
        ]
        
        return {"transactions": transactions_list}
    except SQLAlchemyError as e:
        logger.error(f"Database error in get_transactions_by_date: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error retrieving transactions: {str(e)}"
        )

@app.get("/transactions/{customer_id}")
async def get_customer_transactions(
    customer_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    try:
        # Verify customer belongs to current user
        customer = db.query(Customer).filter(
            Customer.id == customer_id,
            Customer.lender_id == current_user.id
        ).first()
        
        if not customer:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Customer not found or access denied"
            )

        transactions = db.query(Transaction)\
            .filter(Transaction.customer_id == customer_id)\
            .order_by(Transaction.transaction_date.desc())\
            .all()
        
        return {
            "customer_id": customer_id,
            "transactions": [
                {
                    "id": t.id,
                    "transaction_date": t.transaction_date,
                    "amount": float(t.amount),
                    "transaction_type": t.transaction_type,
                    "description": t.description
                }
                for t in transactions
            ]
        }
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error fetching transactions: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error fetching transactions: {str(e)}"
        )
        


@app.post("/api/admin/create", response_model=AdminResponse)
async def create_admin(
    admin_data: AdminCreate,
    db: Session = Depends(get_db)
):
    try:
        # Check for existing admin with same email or mobile
        if db.query(Admin).filter(Admin.email == admin_data.email).first():
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already registered"
            )
        
        if db.query(Admin).filter(Admin.mobile == admin_data.mobile).first():
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Mobile number already registered"
            )

        # Create new admin
        new_admin = Admin(
            name=admin_data.name,
            mobile=admin_data.mobile,
            email=admin_data.email,
            gender=admin_data.gender,
            created_at=datetime.utcnow(),
            updated_at=datetime.utcnow()
        )
        
        db.add(new_admin)
        db.commit()
        db.refresh(new_admin)
        
        return new_admin

    except Exception as e:
        db.rollback()
        logger.error(f"Error creating admin: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )


@app.get("/dashboard")
async def dashboard(user_id: int, db: Session = Depends(get_db)) -> dict:
    try:
        if not db.query(User).filter(User.id == user_id).first():
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found"
            )

        accounts = db.query(Account).filter(Account.lender == user_id).all()
        total_lent = sum(account.amount for account in accounts)
        total_interest = sum(account.amount * (account.interest_rate / 100) for account in accounts)
        return {
            "total_lent": float(total_lent),
            "total_interest": float(total_interest),
            "profit_or_loss": float(total_interest - total_lent)
        }
    except SQLAlchemyError:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error retrieving dashboard data"
        )

@app.get("/api/admins")
async def get_admins(db: Session = Depends(get_db)):
    try:
        admins = db.query(Admin).all()
        return [
            {
                "id": admin.id,
                "name": admin.name,
                "email": admin.email,
                "mobile": admin.mobile,
                "gender": admin.gender,
                "created_at": admin.created_at,
                "updated_at": admin.updated_at
            }
            for admin in admins
        ]
    except Exception as e:
        logger.error(f"Error fetching admins: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error fetching admin list"
        )

class AdminUpdate(BaseModel):
    name: str
    email: str
    mobile: str
    gender: str

    class Config:
        orm_mode = True

# Then the update route
@app.put("/api/admin/{admin_id}", response_model=AdminResponse)
async def update_admin(
    admin_id: int,
    admin_data: AdminUpdate,
    db: Session = Depends(get_db)
):
    try:
        admin = db.query(Admin).filter(Admin.id == admin_id).first()
        if not admin:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Admin not found"
            )
        
        # Check if email is being updated and already exists
        if admin_data.email != admin.email:
            existing_admin = db.query(Admin).filter(
                Admin.email == admin_data.email,
                Admin.id != admin_id
            ).first()
            if existing_admin:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Email already registered"
                )
        
        # Check if mobile is being updated and already exists
        if admin_data.mobile != admin.mobile:
            existing_admin = db.query(Admin).filter(
                Admin.mobile == admin_data.mobile,
                Admin.id != admin_id
            ).first()
            if existing_admin:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Mobile number already registered"
                )

        # Update admin fields
        for field, value in admin_data.dict().items():
            setattr(admin, field, value)
        
        admin.updated_at = datetime.utcnow()

        db.commit()
        db.refresh(admin)
        return admin

    except Exception as e:
        db.rollback()
        logger.error(f"Error updating admin: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )
@app.delete("/api/admin/{admin_id}")
async def delete_admin(admin_id: int, db: Session = Depends(get_db)):
    try:
        admin = db.query(Admin).filter(Admin.id == admin_id).first()
        if not admin:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Admin not found"
            )

        db.delete(admin)
        db.commit()
        return {"message": "Admin deleted successfully"}

    except Exception as e:
        db.rollback()
        logger.error(f"Error deleting admin: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )
        
@app.get("/api/transactions/details")
async def get_transaction_details(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    try:
        # Get all transactions for customers belonging to the current lender
        transactions = (
            db.query(
                Transaction,
                Customer.name.label('customer_name'),
                Customer.customer_id.label('customer_id')
            )
            .join(Customer, Transaction.account_id == Customer.id)
            .filter(Customer.lender == current_user.id)
            .order_by(Transaction.transaction_date.desc())
            .all()
        )
        
        # Format the response
        transaction_details = []
        for transaction, customer_name, customer_id in transactions:
            transaction_details.append({
                "id": transaction.id,
                "customer_name": customer_name,
                "customer_id": customer_id,
                "transaction_date": transaction.transaction_date.strftime("%Y-%m-%d"),
                "amount": float(transaction.amount),
                "transaction_type": transaction.transaction_type,
                "description": transaction.description
            })
        
        return {
            "status": "success",
            "data": transaction_details,
            "total_count": len(transaction_details)
        }
        
    except Exception as e:
        logger.error(f"Error fetching transaction details: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error fetching transaction details: {str(e)}"
        )


#routes for users based on role

# Response model for user data
class UserResponse(BaseModel):
    id: int
    username: str
    email: str
    firstname: str
    lastname: str
    dateofbirth: date
    phonenumber: str
    role: str

    class Config:
        from_attributes = True

# Route to get all users
@app.get("/api/users", response_model=List[UserResponse])
async def get_users(db: Session = Depends(get_db)):
    """
    Retrieve all users from the database
    """
    try:
        users = db.query(User).all()
        return users
    except Exception as e:
        logger.error(f"Error fetching users: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error fetching users"
        )



@app.get("/api/lenders", response_model=List[UserResponse])
async def get_lenders(
    db: Session = Depends(get_db)
):
    """
    Retrieve all lenders from the database
    """
    try:
        # Query only users with 'lender' role
        lenders = db.query(User).filter(User.role == 'lender').all()
        return lenders
    except Exception as e:
        logger.error(f"Error fetching lenders: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error fetching lenders"
        )

# Update UserResponse model to match the fields you want to expose
class UserResponse(BaseModel):
    id: int
    username: str
    firstname: str
    lastname: str
    email: str
    phonenumber: str

    class Config:
        from_attributes = True


def recreate_transactions_table():
    Base.metadata.tables["transactions"].drop(engine, checkfirst=True)
    Base.metadata.tables["transactions"].create(engine)
    
def init_db():
    Base.metadata.create_all(bind=engine)
    
# Initialize database
    init_db()

if __name__ == "__main__":
    recreate_transactions_table()