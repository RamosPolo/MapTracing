FROM python:3.10

WORKDIR /


RUN pip install spyne

RUN pip install lxml

COPY . .

EXPOSE 8033

CMD ["python", "soap.py"]
