#!/bin/bash
export OCP_RELEASE='4.3.0-x86_64' 
export LOCAL_REGISTRY='{{ inventory_hostname }}:5000' 
export LOCAL_REPOSITORY='ocp4/openshift4' 
export PRODUCT_REPO='openshift-release-dev' 
export LOCAL_SECRET_JSON='/tmp/disconnected.json' 
export RELEASE_NAME="ocp-release" 

/usr/local/bin/oc adm -a ${LOCAL_SECRET_JSON} release mirror \
     --from=quay.io/${PRODUCT_REPO}/${RELEASE_NAME}:${OCP_RELEASE} \
     --to=${LOCAL_REGISTRY}/${LOCAL_REPOSITORY} \
     --to-release-image=${LOCAL_REGISTRY}/${LOCAL_REPOSITORY}:${OCP_RELEASE}
