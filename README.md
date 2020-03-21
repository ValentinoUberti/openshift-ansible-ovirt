## Ansible Openshift UPI installer on oVirt

Lab setup:

![alt text](https://raw.githubusercontent.com/ValentinoUberti/openshift-ansible-ovirt/master/files/OvirtLabV2.png)

# THIS IS A WORKING PROJECT! #

You need 2 VMs (bastion and loadbalancer) with two network interfaces: one for internet access and one for internal comunications.

Tested on Fedora 31 and Centos 8 minimal

For openshift cluster create at least 6 vms (1 bootstrap, 3 master and at least 2 workers)

Create a new logical network in oVirt (here called 'openshift_net')

Set the mac address of loadbalancer and openshift nodes in vars/vars.yaml 

Get an openshit pullSecret on  https://cloud.redhat.com/openshift/install  -> Run on Bare Metal

Set the pullSecret in vars/vars.yaml

Set the vms interfaces name  in vars/vars.yaml

Download and install Fedora31 Server or CentOS 8 minimal on both Bastion and LoadBalancer VM

Ensure current user is in the wheel group without need a password for privilege escalation

run: ansible-playbook connected_install.yaml for setup all the machines from scratch

run: ansible-playbook connected_install.yaml -e 'skip_download=yes' from avoiding download of initramfs, kernel and Red Hat CoreOS image

Masters node are set unschedulable.  

Pxe boot all the cluster machines and select 1 bootstrap, 3 masters and at least 2 workers

Depending on the connection speed:
  - take a coffe
  - watch a movie




