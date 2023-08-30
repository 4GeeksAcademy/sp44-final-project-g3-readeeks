"""empty message

Revision ID: b38d4a3a2b97
Revises: d8605a6dfb1f
Create Date: 2023-08-26 22:24:29.148580

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'b38d4a3a2b97'
down_revision = 'd8605a6dfb1f'
branch_labels = None
depends_on = None

def upgrade():
    op.execute("CREATE TYPE document_type_enum AS ENUM ('DNI', 'NIE', 'Passport')")

    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.alter_column('document_type',
               existing_type=sa.VARCHAR(),
               type_=sa.Enum('DNI', 'NIE', 'Passport', name='document_type_enum'),
               existing_nullable=False,
               # Specify the USING clause to cast existing values
               postgresql_using="document_type::document_type_enum")

def downgrade():
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.alter_column('document_type',
               existing_type=sa.Enum('DNI', 'NIE', 'Passport', name='document_type_enum'),
               type_=sa.VARCHAR(),
               existing_nullable=False,
               # Specify the USING clause to cast existing values
               postgresql_using="document_type::VARCHAR")

    op.execute("DROP TYPE document_type_enum")