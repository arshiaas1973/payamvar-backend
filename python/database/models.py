from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column
from sqlalchemy.types import *
from typing import Optional

class Base(DeclarativeBase):
    pass

class User(Base):
    __tablename__="users"

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True, autoincrement=True)
    firstname: Mapped[Optional[str]] = mapped_column("first_name",String(100),nullable=True)
    lastname: Mapped[Optional[str]] = mapped_column("last_name",String(100),nullable=True)
    username: Mapped[str] = mapped_column("username",String(200),nullable=False,unique=True,index=True)
    email: Mapped[str] = mapped_column("email",String(500),nullable=False,unique=True,index=True)
    bio: Mapped[str] = mapped_column("bio",String(1000),nullable=True,unique=False)
    birthday: Mapped[str] = mapped_column("birthday",String(11),nullable=True)
    