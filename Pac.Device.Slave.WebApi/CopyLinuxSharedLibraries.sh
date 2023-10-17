SOURCE_DIR=$1
DESTINATION_DIR=$2

# For debugging, print location

pwd
echo ${SOURCE_DIR}
echo ${DESTINATION_DIR}

# Copy dependencies required by this project

cp -f ${SOURCE_DIR}lib/*.so ${DESTINATION_DIR}
