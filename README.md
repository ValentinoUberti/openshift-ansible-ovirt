## Ansible Openshift UPI installer on oVirt - Automated install

This sets of playbooks will deploy a working openshift 4.4.x cluster on oVirt
The process is complete automated

# Fetatures

- Vlan creation (for internal network)
- Auto template creation for vm (centos 8 cloud)
- Auto detect openshift last version bits
- Interface and connection name are autodetected
- bastion and loadbalancer vms creation and configuration (using cloud-init)
- Openshift vm creation, auto roles selection using mac address (bootstrap, infra, worker and masters)
- Easy configuration
- NFS storage creation for internal registry
- Default cluster admin creation

The bastion vm services are:
- default gateway for openshift nodes
- pxe boot
- dns server

The loadbalancer is both api and application lb (using haproxy)

# Sample vars config

file: groups_vars/all/vars.yaml

```
workspace_directory:
  base_path: /home/ansible/ocpInstallerFile
  config_dir: config
  
networking:
  internal_network: 172.22.0.0
  internal_network_ip: 172.22.0.101
  internal_network_netmask: 255.255.255.0
  external_dns: 8.8.8.8
  domain_name: example.com

dhcp:
  timezone: "Europe/Rome"
  start: 172.22.0.201
  end: 172.22.0.250
  ntp: 204.11.201.10

bastion:
  name: bastion_test
  public_ip: 172.19.0.191
  public_netmask: 255.255.255.0
  public_gateway: 172.19.0.1

lb:
 lb_internal_network_ip: 172.22.0.102
 internal_interface_mac: "56:6f:3d:48:00:03"
 name: lb_test
 public_ip: 172.19.0.192
 public_netmask: 255.255.255.0
 public_gateway: 172.19.0.1

cluster:
  name: bjlovers
  ocp_user: <oc_username>
  ocp_pass: <oc_username_pass>
  masters: 3
  infra: 3
  workers: 3
  pullSecret: ''
  proxy:
    httpProxy: http://<username>:<pswd>@<ip>:<port> 
    httpsProxy: http://<username>:<pswd>@<ip>:<port> 
    noProxy: example.com 
  additionalTrustBundle: |
    -----BEGIN CERTIFICATE-----
        <MY_TRUSTED_CA_CERT>
    -----END CERTIFICATE-----

```
if cluster.proxy is not used, delete it

file: groups_vars/all/ovirt.yaml

Put there all the ovirt configuration

# Required python packages and version

- ansible==2.9.6
- ovirt-engine-sdk-python==4.3.0
- python3-netaddr



# Tested with Fedora 31 base os and Centos 8 Minimal #

Get an openshit pullSecret on  https://cloud.redhat.com/openshift/install  -> Run on Bare Metal

Set the pullSecret in group_vars/vars.yaml

The interface and connection name are autodetected

run: ansible-playbook connected_install.yaml for setup all the machines from scratch

Masters node are set unschedulable.  

Depending on the connection speed:
  - take a coffe
  - watch a movie


# TO DO

- Remove some duplicated vars
- Refactor



