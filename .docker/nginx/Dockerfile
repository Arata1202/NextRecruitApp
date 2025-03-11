FROM nginx:1.22-alpine
ENV TZ=UTC

COPY ./.docker/nginx/*.conf /etc/nginx/conf.d/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
